const axios = require("axios");

async function erkak(textSpeech){
    const encodedParams = new URLSearchParams();
    encodedParams.append("voice_code", "uz-UZ-2");
    encodedParams.append("text", textSpeech);
    encodedParams.append("speed", "1.00");
    encodedParams.append("pitch", "1.00");
    encodedParams.append("output_type", "audio_url");
    
    const options = {
      method: 'POST',
      url: 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '20a8791285mshd579cfa271d2d40p14c43fjsne60c098d082a',
        'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
      },
      data: encodedParams
    };
      const response = await axios.request(options)
      const results = {
        data: response.data,
        audio: response.data.result.audio_url
      }
      return results;
    }


    // erkak()
module.exports = { erkak }