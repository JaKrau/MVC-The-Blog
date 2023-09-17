// If the user isn't signed in, redirect them to the sign in page
const authorize = (req, res, next) => {
    if (!req.session.signed_in) {
      res.redirect('/signin');
    } else {
      next();
    }
  };
  
  // If the user is signed in, redirect them to the home page
  const signedIn = (req, res, next) => {
    if (req.session.signed_in) {
      res.redirect('/');
    } else {
      next();
    }
  };

// Handles most errors that occur in the app and passes the variables to the handlebars template to be used in the statusError page
function handleError(err, res, req) {
    let statusCode, errorCode, message;
    console.error(err);
  
    switch (err.message) {
      case "UserCreationFailed":
      case "UserValidationFailed":
      case "PostCreationFailed":
      case "PostUpdateFailed":
      case "PostDeletionFailed":
      case "CommentCreationFailed":
        statusCode = 401;
        errorCode = "401";
        message = "Unauthorized. Failed Validation.";
        break;
      case "NotFound":
        statusCode = 404;
        errorCode = "404";
        message = "Resource not found.";
        break;
      case "UserAlreadyExists":
        statusCode = 409;
        errorCode = "409";
        message = "User already exists.";
        break;
      default:
        statusCode = 500;
        errorCode = "500";
        message = "Internal Server Error.";
        break;
    }
    res.status(statusCode).render('statusError', {
      errorCode,
      message,
      user_id: req.session.user_id,
      username: req.session.username,
      signed_in: req.session.signed_in,
    });
  }