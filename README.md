### Setup

```sh
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install postgresql
$ pg_ctl -D /usr/local/var/postgres start && brew services start postgresql
