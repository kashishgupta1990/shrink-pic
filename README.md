# shrink-pic 
Command line tool which compress the .png and .jpg images. It uses `https://tinypng.com/` API to compress your images.

## Module Usage 

### Install
```sh
 npm install shrink-pic -g
 ```
 
### Visit: `https://tinypng.com/developers` and get you API key generated.
```sh 
shrink-pic -k <your-secret-key>
 ```
This command will save your key and will use this key to compress your images. You can update the `KEY` by just run this same command again with new 'KEY'.

 Usage: shrink-pic [ -d destinationFolder ] [ -k SedasdeEEW1231asd213 ] -s sourceFolder

  Options:

    -h, --help                                      output usage information
    -V, --version                                   output the version number
    -s, --source <source-directory-path>            mention the source directory path.
    -d, --destination <destination-directory-path>  mention destination directory path.
    -k, --apikey <api-key-save>                     mention api key to save or renew.

### Read our blog for more detail.
http://blog.kashishgupta.in/2016/10/22/compress-image-using-nodejs-shrink-pic-tool/
