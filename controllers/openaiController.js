const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSizes = {
    small: "256x256",
    medium: "512x512",
    big: "1024x1024",
  };
  const imageSize = imageSizes[size];
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      sucess: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    // for frontend
    res.status(400).json({
      sucess: false,
      error: "The image could not be generated",
    });
  }
};

module.exports = { generateImage };
