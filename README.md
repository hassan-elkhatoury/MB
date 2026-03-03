# MongoDB Sharded Cluster Deployment

This project documents and presents the deployment of a MongoDB Sharded Cluster distributed across 4 physical machines, using Docker and Docker Compose.

It is built around an interactive web application (the technical presentation) and also provides all the necessary configuration files to reproduce the architecture locally.

## Cluster Architecture

The architecture is distributed across 4 machines (Laptops) communicating with each other via the local network:

*   **Laptop 1 ** : Routing server (1 x `mongos`).
*   **Laptop 2 ** : Configuration server (Config Server) + Primary Node of Replica Set 1 (`rs1_p`) + Secondary nodes for `rs2` and `rs3` + `mongos` router.
*   **Laptop 3 ** : Configuration server + Primary Node of Replica Set 2 (`rs2_p`) + Secondary nodes for `rs1` and `rs3` + `mongos` router.
*   **Laptop 4 ** : Configuration server + Primary Node of Replica Set 3 (`rs3_p`) + Secondary nodes for `rs1` and `rs2` + `mongos` router.

## Project Structure

*   **/docker-cluster/** : Contains the specific `docker-compose.yml` files for each machine to deploy the containers (MongoDB config, data nodes, mongos routers). Read the [dedicated README](./docker-cluster/README.md) for details.
*   **Web Application (Presentation)** : The source files at the root of the project correspond to the Next.js web application that serves as an interactive presentation medium to explain the architecture, network configuration (`/etc/hosts`), shell commands for initializing Replica Sets, and adding Shards.

## Setting up the MongoDB Cluster (Summary)

To deploy the architecture:
1.  **Network Configuration:** Modify the `hosts` file of each system so they can ping each other (laptop1, laptop2, laptop3, laptop4).
2.  **Launch Docker Compose:** Execute the appropriate docker-compose file on each respective machine using `docker-compose up -d`.
3.  **Initialize Config Servers:** Connect to one of the config servers to initialize the `configRS` Replica Set.
4.  **Initialize Data Shards:** Initialize the Replica Sets `rs1`, `rs2` and `rs3` on their respective Primary nodes.
5.  **Enable Sharding:** Connect to a `mongos` instance, add the shards to the cluster via `sh.addShard()`, and enable sharding on your target databases and collections via `sh.enableSharding()`.

Check the slides of the web application for the exact Mongo Shell (`mongosh`) commands to execute at each step.

## Technologies Used

*   **Docker & Docker Compose** for database container deployment.
*   **MongoDB 6.0**
*   **Next.js & React & TailwindCSS & Framer Motion** (Frontend for the interactive presentation).

## Running the Presentation Web App

To view or modify the interactive presentation (Next.js):

```bash
# Install dependencies
npm install

# Start the local development server
npm run dev
```

The presentation will be accessible at `http://localhost:3000`.