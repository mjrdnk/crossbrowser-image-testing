# crossbrowser-image-testing

Run locally: `yarn dev`

## Endpoints:

### GET /screenshot

#### query params:

| Query param |   Type   | Description                                         | Example                                              |
| ----------- | :------: | :-------------------------------------------------- | :--------------------------------------------------- |
| url         |  string  | Valid url                                           | https://github.com/mjrdnk/crossbrowser-image-testing |
| retake      | boolean? | Should retake the image (puts it in new/ directory) | 1                                                    |

### GET /compare

Prerequisites: new and original images are screenshot and sitting in `original/` and `new/` directories in the project root under `downloads/`.
Calling this endpoint will create a diff between `new/` and `original/` image of each browser type, and will place the diffs in `diff/` directory.

### correct filestructure

After
![File Tree](public/images/file_tree.png)
![Original](public/images/original.png)
![New](public/images/new.png)
![Diff](public/images/diff.png)
