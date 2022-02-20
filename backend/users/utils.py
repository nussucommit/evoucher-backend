from django.core.mail import EmailMessage

class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data['subject'] , body = data['email_body'] , to = data['to-email'])
        email.send()
