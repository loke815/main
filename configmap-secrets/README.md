configmaps store non-sensitive data into pods via environment variables(or) volumes.
```
#cm.yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  APP_PORT: "3000"
```
```
vim cm.yml
```
```
kubectl apply -f cm.yml
```
```
kubectl get cm
```
    kubectl describe cm app-config

```
#deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: loki-demo-deployment
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
        env:
         - name: APP_PORT
           valueFrom:
              configMapKeyRef:
                name: app-config
                key: APP_PORT
        ports:
        - containerPort: 3000
```
```
vim deployment.yml
```
```
kubectl apply -f deployment.yml
```
```
kubectl get pods 
```
```
     kubectl exec -it loki-demo-deployment-6798749b7-n5s97  -- sh
     /app # env | grep APP
     #you can get 'APP_PORT= '
```

VolumeMounts:

volumeMounts allows you to edit data in files 

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  APP_PORT: "2000"
```
```
#deployment for volumemounts
apiVersion: apps/v1
kind: Deployment
metadata:
  name: loki-demo-deployment
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
        volumeMounts:
        - name: app-connection
          mountPath: /opt
        ports:
        - containerPort: 3000
      volumes:
      - name: app-connection
        configMap:
          name: app-config
```
Same steps for apply, get pods, describe 

        kubectl exec -it loki-demo-deployment-595f4cbf8c-djhgq  -- sh
       /app # cat /opt/APP_PORT |more
        2000/app #


SECRET 

CM.YML
```
#cm.yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_ENV: production
  APP_PORT: "5000"
```

#Secret
you can also use to create vim secret.yml


for secret

     #you can also create like this
     kubectl create secret generic test-secret --from-literal = APP_PORT="5000"


     kubectl describe secret test-secret

```
kubectl edit secret test-secret
#its open in encrepted
```
      echo NTAwMA== | base64 --decode

