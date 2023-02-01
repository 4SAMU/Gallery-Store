<!-- @format -->

npm install nodemon express bcrypt jsonwebtoken multer path

```js

const file = req.body.file;

    console.log(file);
    // Create a new MongoDB document with the file data
    const newFile = new User({
      contentType: file.mimetype,
      data: file.buffer,
    });

    // newFile.save((err, savedFile) => {
    //   if (err) throw err;
    //   console.log("File inserted into MongoDB");
    //   const fileUrl = `files/${savedFile._id}`;
    //   console.log(fileUrl);
    //   res.status(200).json({ fileUrl });
    // });





const token = req.body.tokenX;
    console.log(token);
    if (!token) {
      return res.status(400).json({ status: "error", error: "Token missing" });
    }

    try {
      const decoded = jwt.verify(token, "secret123");
      const email = decoded.email;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.json({ status: "error", error: "user not found" });
      } else {
        if (req.body.password) {
          const newPassword = await bcrypt.hash(req.body.password, 10);
          user.password = newPassword;
        }
        user.name = req.body.name;
        user.email = req.body.email;
        user.avatar = req.file ? req.file.filename : user.avatar;
        // user.avatar = req.body.selectedFile;

        await user.save();
        const tokenUpdate = jwt.sign(
          {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
          "secret123"
        );
        res.json({ status: "ok", user: tokenUpdate });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  }
```
