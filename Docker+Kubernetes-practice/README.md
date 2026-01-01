🚀 Docker Image Creation & Kubernetes Deployment (Step-by-Step)

This guide explains how to:

Create a Docker image using a multi-stage Dockerfile

Push the image to Docker Hub

Deploy the application on Kubernetes using Minikube

Expose and access the application

Update and rollback deployments

✅ Prerequisites

Make sure the following are installed and running:

docker --version
docker info
kubectl version --client
minikube status


Ensure:

Docker is installed

Docker Desktop is running

Docker Hub account available

Kubernetes CLI (kubectl) installed

Minikube installed

📥 Clone Repository (Optional)

You can either clone a Git repository or create files manually.

git clone <your-git-repository-url>
cd <repository-name>

🟢 Create app.js
```Javascript
// app.js
const http = require("http");

http.createServer((req, res) => {
  res.end("Multi-stage Dockerfile practice");
}).listen(3000);

🟢 Create Dockerfile (Multi-Stage Build)
```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app
EXPOSE 3000
CMD ["node", "app.js"]

🟢 Build Docker Image
docker build -t lokesh815/my-first-docker-image1:latest .

🟢 Run Docker Container (Test Locally)
docker run -it -p 3000:3000 lokesh815/my-first-docker-image1:latest


Open in browser:

http://localhost:3000

🔐 Login to Docker Hub
docker login

🟢 Push Image to Docker Hub
docker push lokesh815/my-first-docker-image1:latest

☸️ Kubernetes & Minikube Setup

Check versions and status:

kubectl version
minikube status

Start Minikube

Using Docker Desktop driver (Windows):

minikube start


Using VirtualBox driver:

minikube start --memory=4096 --driver=virtualbox

🟢 Create deployment.yml
```yaml 
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: demo-app
  template:
    metadata:
      labels:
        app: demo-app
    spec:
      containers:
      - name: demo-container
        image: lokesh815/my-first-docker-image1:latest
        ports:
        - containerPort: 3000


Apply the deployment:

kubectl apply -f deployment.yml

🔍 Verify Deployment
kubectl get deployments
kubectl get pods

🟢 Create service.yml
```yml
apiVersion: v1
kind: Service
metadata:
  name: demo-service
spec:
  selector:
    app: demo-app
  type: NodePort
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000


Apply the service:

kubectl apply -f service.yml

🔍 Check Service
kubectl get svc

🌐 Access the Application
Option 1: Using Minikube Service (Recommended)
minikube service demo-service


This will automatically open the application in your browser.

Option 2: Port Forwarding (If Docker Driver Issue)
kubectl port-forward service/demo-service 3000:3000


Open in browser:

http://localhost:3000

🔄 Update Deployment (New Image Version)

If you push a new image version (example: :2):

kubectl set image deployment/demo-deployment demo-container=lokesh815/my-first-docker-image:2


Check rollout status:

kubectl rollout status deployment/demo-deployment

⏪ Rollback Deployment (If Needed)
kubectl rollout undo deployment/demo-deployment
