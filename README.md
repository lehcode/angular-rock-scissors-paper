# Rock-Paper-Scissors Angular Application

## Architecture

1. Docker Compose
    - Service
    - Volume mounts
    - Networking & port forwarding
    - Environment variables
    - User/group mapping
2. Yarn package manager
3. Angular application

## Usage

1. Docker: `docker compose up` will start container with application available at http://localhost:4200/
2. Local: 
```bash
$ yarn global add nx @nx/angular @nx/workspace
$ nx run game:serve
```
