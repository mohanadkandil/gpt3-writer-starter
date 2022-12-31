import { Configuration, OpenAiApi } from 'openapi'

const configuration = new Configuration({
  apiKey: process.env.OPENAPI_API_KEY,
})

const openapi = new OpenAiApi(Configuration)

const basePromptPrefix = ""

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openapi.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temprature: 0.7,
    max_tokens: 250,
  })

  const basePromptOutput = baseCompletion.data.choices.pop()

  res.status(200).json({output: basePromptOutput})
}

export default generateAction
