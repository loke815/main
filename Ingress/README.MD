
What Is an Ingress Controller?

An Ingress Controller is a Kubernetes component that:

✅ Watches Ingress resources in your cluster
✅ Configures a load balancer / reverse proxy to route external HTTP(S) traffic to Services
✅ Applies routing rules like host-based or path-based routing, TLS termination, etc.

Ingress = Rule / Configuration
Ingress Controller = The engine that implements those rules

🔍 How It Works (High Level)

You define Ingress rules (hosts, paths, services, TLS certs).

The Ingress Controller reads those rules.

It configures a proxy (NGINX, HAProxy, Envoy, etc.) to handle external traffic.

Traffic enters through a single external IP (or LoadBalancer) and gets routed internally.

Why Use an Ingress Controller?
Feature	Ingress Controller
Central entry point	✅
TLS/SSL Termination	✅
Path-based routing	✅
Host-based routing	✅
Load balancing	✅
Multiple apps on one IP	✅
API for rules	Kubernetes Ingress
🧠 Supported Routing Rules

Ingress rules can route traffic based on:

✔ Hostname (e.g., app.example.com)
✔ URL Path (e.g., /api, /web)
✔ TLS certificates
✔ Annotations (for advanced behaviors like rate limiting, rewrites)

🌐 Popular Ingress Controllers

Here are widely used controllers:


1. NGINX Ingress Controller

Most common/default choice in Kubernetes setups

Acts as an NGINX reverse proxy

Supports SSL, rewrite rules, annotations for many configurations

Stable and well supported

Use when: You want a well-documented, reliable HTTP reverse proxy.

2. Traefik

Modern HTTP reverse proxy

Auto-configures with dynamic backends

Built-in support for metrics, Let’s Encrypt

Use when: You want auto HTTPS + metrics easily.

3. HAProxy Ingress

High performance, low latency

Great for higher throughput environments

Use when: Performance matters.

4. Ingress with Service Mesh (e.g., Envoy via Istio)

Istio/Linkerd use Envoy as data plane

Ingress handled via Gateway resources

Use when: You’re also using a service mesh.

🧪 Example: Basic Ingress Resource

Here’s a simple Kubernetes Ingress that routes traffic for two services:
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /web
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
  tls:
  - hosts:
    - example.com
    secretName: example-tls
```

Here:
✔ Requests to example.com/web → frontend-service
✔ Requests to example.com/api → api-service
✔ TLS is enabled using example-tls secret

🧠 Key Concepts
Term	Meaning
Ingress	Resource that defines HTTP/S routing rules
Ingress Controller	Component that implements those rules
LoadBalancer Service	Optional way to expose the controller externally
Annotations	Controller-specific settings in Ingress
TLS Secret	Kubernetes secret holding SSL key/cert
