import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

load_dotenv()
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")

recipient_num = '7035980471'
rec = "tmomail.net"# Recipient's phone number
sender_email = 'kingkirito9999@gmail.com'
sender_password = SENDER_PASSWORD
sms_gateway = f"{recipient_num}@{rec}"
message_body = "Help save me daddy"
msg = MIMEText(message_body)
msg['From'] = sender_email
msg['To'] = sms_gateway
msg['Subject'] = "SMS via Email"

with smtplib.SMTP("smtp.gmail.com", 587) as server:
    server.starttls()
    server.login(sender_email, sender_password)
    server.sendmail(sender_email, sms_gateway, msg.as_string())

print("Message sent!")