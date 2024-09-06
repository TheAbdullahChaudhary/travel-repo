## Rails-Next-Docker Development Environment

### Installation

tldr: 
* Give terminal full disk access
* Install docker
* Add git ssh keys
* Clone this repo
* Add `$(pwd)/dev-tooling/bin` to your path
* s-start --dev

#### Detailed Instructions

* Download/install Docker https://www.docker.com/get-started


You will need to be able to decrypt the development credentials file. Contact the Development team for access
Then copy the key to `config/credentials/development.key`

Add the dev-tooling bin directory to your path:
```bash
echo "export PATH=$(pwd)/dev-tooling/bin":'$PATH' >> ~/.zprofile
source ~/.zprofile
```

Start the Docker setup. This will prompt for a password to run:
```bash
s-start --dev
```

### Tooling Overview 

The tooling scripts that have been added are all name spaced with ```s-```, so you should be able to autocomplete
by typing ```s-TAB```. The scripts should all have a flag to display usage information. For example typing
```bash
s-docker-build -h
```
Will display usage information and additional flags to available to run the script.
Please note that while useful, these scripts shouldn't substitute for having an understanding
of how docker works. Please review the Get Started docker guides:
https://docs.docker.com/


A quick way to get access to a rails console is by running:
```bash
s-console
```
Stop the docker services by running
```bash
s-stop
```

You can tail the logs using 
```bash
s-log
```

### Backing Up & Restoring Postgres

If you need to rebuild the development environment, the following commands will allow you to back up MySQL and then 
restore it once you've rebuilt. Be sure to save the exported file to your local machine, and not the VM you'll be deleting.

Backup:

```bash
s-db-dump
```

This will produce a file with the name `tmp/dev-db-$TIMESTAMP.sql`.

Restore:
Run:
```bash
s-db-init
```
This will grab the latest `dev-db sql` file and restore it, or use `rails db:setup` if no file is found.

### Tests

```bash
s-test
```
# travel-repo
