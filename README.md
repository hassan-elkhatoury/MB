# 🍃 MongoShard: Distributed Cluster Lab

## 🌟 Overview

**MongoShard** is a comprehensive, interactive laboratory project designed to demonstrate the real-world deployment of a highly available, sharded MongoDB cluster across multiple physical machines. 

This project dual-functions as both **Infrastructure as Code** (ready-to-use Docker Compose files) and an **Interactive Presentation Deck** (a Next.js web app built to guide users step-by-step through the deployment process).

## 🏗️ Architecture Design

The MongoDB cluster is distributed across 4 machines (Laptops) communicating via a local area network (LAN). This setup ensures high availability, redundancy, and load balancing.

*   **Laptop 1 **: 
    *   `mongos` (Routing Server) - Handles client requests and routes them to the appropriate shards.
*   **Laptop 2 **: 
    *   Config Server Node (`configRS`)
    *   Primary Node for Replica Set 1 (`rs1_p`)
    *   Secondary Node for Replica Set 2 (`rs2_s2`)
    *   Secondary Node for Replica Set 3 (`rs3_s2`)
    *   `mongos` (Routing Server)
*   **Laptop 3 **: 
    *   Config Server Node (`configRS`)
    *   Primary Node for Replica Set 2 (`rs2_p`)
    *   Secondary Node for Replica Set 1 (`rs1_s2`)
    *   Secondary Node for Replica Set 3 (`rs3_s3`)
    *   `mongos` (Routing Server)
*   **Laptop 4 **: 
    *   Config Server Node (`configRS`)
    *   Primary Node for Replica Set 3 (`rs3_p`)
    *   Secondary Node for Replica Set 1 (`rs1_s3`)
    *   Secondary Node for Replica Set 2 (`rs2_s3`)
    *   `mongos` (Routing Server)

## 📂 Project Structure

*   **`/docker-cluster/`**: Contains the targeted `docker-compose.yml` configurations for each of the 4 laptops. Refer to the [Docker Setup README](./docker-cluster/README.md) for node-specific launch instructions.
*   **Web Application (Root)**: The Next.js 14 app providing an interactive, slide-by-slide tutorial on configuring hosts, initiating Docker containers, setting up replica sets, and injecting data.

## 🚀 Setting up the MongoDB Cluster (Quick Guide)

1.  **LAN Configuration:** Edit the `/etc/hosts` (macOS/Linux) or `C:\Windows\System32\drivers\etc\hosts` (Windows) file on every laptop so they can address each other locally using standard hostnames (`laptop1`, `laptop2`, `laptop3`, `laptop4`).
2.  **Docker Initialization:** Spin up the assigned `docker-compose.yml` on each laptop.
    ```bash
    docker-compose up -d
    ```
3.  **Initialize Config Servers:** Access the Mongo shell on any config server container and initiate the `configRS` replica set.
4.  **Initialize Shard Replicas:** Init `rs1`, `rs2`, and `rs3` from their respective Primary nodes.
5.  **Enable Sharding:** Log into any running `mongos` router, map the shards (`sh.addShard()`), and enable sharding on your target databases and collections.

*Note: For the exact `mongosh` queries, start the Next.js presentation web app.*

## 💻 Technologies Used

**Infrastructure:**
*   **MongoDB 6.0** (Core database engine)
*   **Docker & Docker Compose** (Containerization and orchestration)

**Presentation Web App:**
*   **Next.js (App Router)** (React framework)
*   **Tailwind CSS** (Styling)
*   **Framer Motion** (Smooth slide transitions and animations)
*   **Lucide React & Shadcn UI** (Icons and reusable UI components)

## 🏃‍♂️ Running the Interactive Presentation

To launch the web-based slide deck on your local machine:

```bash
# Install NPM dependencies
npm install

# Start the Next.js development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the presentation.