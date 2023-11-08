from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

class Message(BaseModel):
    user: str
    text: str

messages = []

@app.post("/send-message/")
async def send_message(message: Message):
    messages.append(message)
    elements = message.text.split(',')
    s,k = map(str.strip, elements)
    kl=k.split(',')
    return {"message":kl}
@app.post("/send-and-receive-message/")
async def send_and_receive_message(message: Message):
    messages.append(message)
    
    elements = message.text.split(',')
   
    if len(elements) != 7:
        return {"message": "Received text does not contain 7 elements separated by a comma"}

    gender, bmi, b_sugar, b_pressure, b_cholestrol, activity_level, food_preferences = map(str.strip, elements)

    # Run the Python script and capture its output
    try:
        result = subprocess.check_output(
            ['python', 'FoodReco.py', gender, bmi, b_sugar, b_pressure, b_cholestrol, activity_level, food_preferences],
            text=True, stderr=subprocess.STDOUT
        )

        # Return the result to React
        return {"message": result}
    except subprocess.CalledProcessError as e:
        return {"message": f"Script failed with error: {e.returncode}\n{e.output}"}

class FeedbackRequest(BaseModel):
    feedback: str

# Email Configuration
EMAIL_ADDRESS = "hashinimuthu98@gmail.com"
EMAIL_PASSWORD = "Hashinikdu1998"
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

def send_feedback_email(feedback_text):
    try:
        # Create an SMTP object
        server = smtplib.SMTP(host=SMTP_SERVER, port=SMTP_PORT)
        server.starttls()

        # Login to your email account
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

        # Create the email message
        subject = "Feedback Received"
        message = MIMEMultipart()
        message['From'] = EMAIL_ADDRESS
        message['To'] = EMAIL_ADDRESS
        message['Subject'] = subject
        message.attach(MIMEText(feedback_text, 'plain'))

        # Send the email
        server.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, message.as_string())

        # Close the server
        server.quit()

        return True
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return False

@app.post("/submit-feedback/")
async def submit_feedback(feedback: FeedbackRequest):
    if send_feedback_email(feedback.feedback):
        return {"message": "Feedback submitted and email sent successfully!"}
    else:
        return {"message": "Feedback submitted but failed to send an email."}