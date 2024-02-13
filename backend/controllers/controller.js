// const User = require('../database/userModal');
// const userService = require('../services/userService');
const data = require('../data/data.json');
const getCandidateData = (req, res) => {
  try {
    res.json(data);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } });
  }
};
const getMe = async (req, res) => {
  try {
    const retrivedUser = await userService.getMe(req.user._id);
    res.json(retrivedUser);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } });
  }
};
/*const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  // console.log("refres token ==", refreshToken);
  //json error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  try {
    const newTokens = await userService.refreshToken(refreshToken);
    res.json(newTokens);
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};*/
const refreshToken = async (req, res) => {
  const oldRefreshToken = req.body.token;
  // console.log("refres token ==", refreshToken);
  //json error if there is no token or it's invalid
  if (!oldRefreshToken)
    return res.status(401).json('You are not authenticated!');

  try {
    console.log('old ref token = ', oldRefreshToken);
    const foundUser = await User.findOne({ refreshToken: oldRefreshToken });
    // console.log("Found user", foundUser);
    if (!foundUser) {
      jwt.verify(
        oldRefreshToken,
        process.env.JWT_REFRESH_SECRET,
        async (err, decoded) => {
          if (err) return res.json({ message: 'Forbidden' });
          const hackedUser = await User.findOne({ _id: decoded.id });
          hackedUser.refreshToken = [];
          // const result = await hackedUser.save();
          const result = await User.findOneAndUpdate(
            { _id: hackedUser._id },
            { refreshToken: hackedUser.refreshToken }
          );
        }
      );
      return res.json({ message: '403 Forbidden' }); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(
      (rt) => rt !== oldRefreshToken
    );

    console.log('New Refresh Token array =', newRefreshTokenArray);

    let newAccessToken;
    let newRefreshToken;

    jwt.verify(
      oldRefreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        console.log('Err and Decoded= ', err, decoded);
        if (err) {
          foundUser.refreshToken = [...newRefreshTokenArray];
          // const result = await foundUser.save();
          const result = await User.findOneAndUpdate(
            { _id: foundUser._id },
            { refreshToken: foundUser.refreshToken }
          );
        }
        if (err || foundUser.id !== decoded.id)
          return res.json({ message: '403' });

        console.log('err,decoded ', err, decoded);

        newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
          expiresIn: '10s',
        });
        newRefreshToken = jwt.sign(
          { id: decoded.id },
          process.env.JWT_REFRESH_SECRET
        );

        console.log(
          'New token & new refresh token =',
          newAccessToken,
          newRefreshToken
        );

        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        console.log('FoundUser.refresToken ===', foundUser.refreshToken);
        // const result = await foundUser.save();
        const result = await User.findOneAndUpdate(
          { _id: foundUser._id },
          { refreshToken: foundUser.refreshToken }
        );
        res.json({
          token: newAccessToken,
          refreshToken: newRefreshToken,
        });
      }
    );
    // if (newAccessToken && newRefreshToken) {
    //   res.json({
    //     token: newAccessToken,
    //     refreshToken: newRefreshToken
    //   })
    // } else {
    //   res.json({
    //     message: "forbidden 403"
    //   })
    // }
  } catch (error) {
    res.json({
      status: error?.status || 500,
      message: error?.message || error,
    });
  }
};

const registerUser = async (req, res) => {
  const { body } = req;
  if (!body.name || !body.emailID || !body.password) {
    res.status(400).json({
      status: 'FAILED',
      data: {
        error: 'Request body missing some of the properties',
      },
    });
    return;
  }
  try {
    const user = {
      name: body.name,
      emailID: body.emailID,
      password: body.password,
    };
    const newUser = await userService.registerUser(user);
    if (newUser?.status === 201) {
      res.status(201).json(newUser);
    } else if (newUser?.status === 400) {
      res.status(400).json(newUser);
    }
  } catch (error) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailID, password } = req.body;
    if (!emailID || !password) {
      throw res.status(400).json({
        status: 'FAILED',
        message: 'Email Id or password can not be empty!',
      });
    }
    const retrivedUser = await userService.loginUser({ emailID, password });
    if (retrivedUser?.status === '401') {
      // console.log("res.status(401).json({ message: Login failed! })");
      return res.status(401).json(retrivedUser);
    } else {
      // console.log("res.status(200).json(retrivedUser)");
      return res.status(200).json(retrivedUser);
    }
  } catch (error) {
    throw res
      .status(error?.status || 500)
      .json({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

module.exports = {
  getCandidateData,
};
