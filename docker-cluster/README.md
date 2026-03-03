# MongoDB Sharded Cluster Docker Compose Files

This directory contains the `docker-compose.yml` configurations required to deploy the MongoDB sharded cluster distributed across 4 hosts (laptops). This setup is used corresponding to the presentation slides.

## Architecture

The cluster is distributed as follows:

*   **Laptop 1 **: Runs a single `mongos` router.
*   **Laptop 2 **: Runs a config server node, primary for Replica Set 1 (`rs1_p`), secondary for RS2 (`rs2_s2`), secondary for RS3 (`rs3_s2`), and a `mongos` router.
*   **Laptop 3 **: Runs a config server node, primary for RS2 (`rs2_p`), secondary for RS1 (`rs1_s2`), secondary for RS3 (`rs3_s3`), and a `mongos` router.
*   **Laptop 4 **: Runs a config server node, primary for RS3 (`rs3_p`), secondary for RS1 (`rs1_s3`), secondary for RS2 (`rs2_s3`), and a `mongos` router.

## Setup Instructions

1. Each laptop should copy its respective `docker-compose-laptopX.yml` file and rename it to `docker-compose.yml`.
2. Ensure Docker is installed on all hosts.
3. Configure the `/etc/hosts` (Linux/macOS) or `C:\Windows\System32\drivers\etc\hosts` (Windows) file on all laptops so they can resolve the hostnames (`laptop1`, `laptop2`, `laptop3`, `laptop4`).
4. In the folder containing the `docker-compose.yml` file, run:
   ```bash
   docker-compose up -d
   ```
5. Follow the presentation slides to initialize the Replica Sets and add the shards through the `mongos` routers.