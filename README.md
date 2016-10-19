# shrink
Command line tool which compress the .png and .jpg images.

It's a module which convert your `JavaScript` code into some not understandable format and still it's executable.
This module can be used to protect the code base which run's on browser's client side or we can protect the NodeJs code base as well.
We have to mention the few options provided where `sourceDir` is mandatory field. Just mention the root path in this field and `code-protect` converts all the `.js` files present in sub-folder.

## Module Usage 

### Install
 `npm install shrink-pic -g`

 Usage: shrink-pic [ -d destinationFolder ] [ -i 3 ] [ -k SedasdeEEW1231asd213 ] -s sourceFolder

  Options:

    -h, --help                                      output usage information
    -V, --version                                   output the version number
    -s, --source <source-directory-path>            mention the source directory path.
    -d, --destination <destination-directory-path>  mention destination directory path.
    -k, --apikey <api-key-save>                     mention api key to save or renew.
