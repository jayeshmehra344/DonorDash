from flask import Flask
from flask_cors import CORS
from routes.donation_routes import donation_routes
from routes.charity_routes import charity_routes

app = Flask(__name__)
CORS(app)  # Allow frontend to call API

# Register routes
app.register_blueprint(donation_routes, url_prefix="/api/donations")
app.register_blueprint(charity_routes, url_prefix="/api/charities")

if __name__ == "__main__":
    app.run(debug=True)
