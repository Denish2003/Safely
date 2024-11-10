from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()
ACCOUNT_SID = os.getenv("ACCOUNT_SID")
AUTH_TOKEN = os.getenv("AUTH_TOKEN")

account_sid = ACCOUNT_SID
auth_token = AUTH_TOKEN
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="HELP PLEASE SAVE ME PAPI",
    from_='13152763924',  # Replace with your Twilio number
    to='9293719720'      # Replace with recipient's phone number
)

print(f"Message sent! SID: {message.sid}")