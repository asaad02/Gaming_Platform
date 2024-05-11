#!/bin/sh

function addRemote () {
  	echo "Updating system and installing SSH client..."
    apt-get update -y && apt-get install -y openssh-client 
    
    echo "Starting the SSH agent..."
    eval $(ssh-agent -s)
    # Starts the SSH agent, which manages SSH keys.

    echo "Setting up private key..."
    chmod 600 $SSH_PRIVATE_KEY || { echo "Failed to set permissions for private key"; exit 1; }
    # Sets the permissions of the private key file to be readable only by the file owner. If it fails, prints an error message and exits with status 1.

    ssh-add $SSH_PRIVATE_KEY || { echo "Failed to add private key to SSH agent"; exit 1; }
    # Adds the private key to the SSH agent. If it fails, prints an error message and exits with status 1.

    mkdir -p ~/.ssh
    # Creates the '.ssh' directory in the user's home directory if it doesn't already exist.

    chmod 700 ~/.ssh
    # Sets the permissions of the '.ssh' directory to be accessible only by the user.

    echo "Adding server to known hosts..."
    ssh-keyscan cis4250w24-03.socs.uoguelph.ca >> ~/.ssh/known_hosts || { echo "Failed to add server to known hosts"; exit 1; }
    # Adds the server's SSH key to the list of known hosts. If it fails, prints an error message and exits with status 1.

    chmod 644 ~/.ssh/known_hosts
    # Sets the permissions of the 'known_hosts' file to be readable and writable by the user, and readable by others.
}