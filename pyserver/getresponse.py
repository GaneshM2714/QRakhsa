import os
import google.generativeai as genai
from dotenv import load_dotenv 

load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
  ]
)

response = chat_session.send_message("Tell me possible Allergies and diseases that i may have over the symptoms of coughing, sneezing, and fever.Provide it in a list format and do not add any other information.")

print(response.text)