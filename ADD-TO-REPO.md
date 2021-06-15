## Add new Package to Online Repository

If you want to add a new package to the online repository, please follow those steps:

### Fork the project 

First, you'll have to fork the project so that you can modify the needed files.

![Fork](https://docs.github.com/assets/images/help/repository/fork_button.jpg)

### Create a new Package

In the MSFS Community Downloader, go to "add a new package" and then "Create a new package". 
Fill all the needed fields and save. 

Please make sure that the `ID` and the `Folder Name` are the same. 

Once created, check that the package is working as expected. Then export the package as `package.json`.

Also, prepare an illustration image, the recommended size is 1500x530px and name it `illustration.jpg`.

### Place your package in the repository

Go to the `docs` folder, here edit the `index.json` file by adding a new entry: 

``` DIFF
[
  {
    "id":"aircraft-tbm930-improvement",
    "name":"MixMugz TBM 930 Project",
    "version":"1.0.0"
  },
  {
    "id":"C208B-mod",
    "name":"SCS Cessna 208B Improvement Mod",
    "version":"1.0.0"
  },
  {
    "id":"Cessna-182T",
    "name":"Geoffda Cessna-182T",
    "version":"1.0.0"
-  }
+  },
+  {
+    "id":"<my package folder name>",
+    "name":"<my package listing name>",
+    "version":"1.0.0"
+  }
]
```

Then create a new folder with the ID/Folder name as the folder name, and copy the `package.json` and `illustration.jpg` files into it.
Also modify the `illustration` path in the `package.json` file to use the following pattern:

```
 "illustration": "https://nicolasconstant.github.io/msfs-community-downloader/<Package-ID>/illustration.jpg",
```

Commit your changes. 

### Open a PR 

Open a Pull-Request to this repository. See the [documentation](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) if it's new to you.

The submission will then be curated and added to the repository if accepted. 
If your PR isn't accepted, you can still distribute the `package.json` file to your users so that they can import it themselves. 
