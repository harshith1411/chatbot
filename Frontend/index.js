// 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

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-ATN1ngWkatx2vlRtDRhSx68k",
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

async function callApi(){
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data.choices[0].text)
}

callApi()