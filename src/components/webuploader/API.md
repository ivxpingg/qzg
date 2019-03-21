## webuploader props

|属性|说明|类型|默认值|
|:---|:---|:---:|:---:|
|action|上传的地址，必填|String|-|
|multiple|是否支持多选文件|Boolean|true|
|accept|接受上传的文件类型|String|-|
|defaultFiles|默认上传过的列表|Array|[]|
|formData|上传时附带的额外参数|Object|{}|
|on-uploadSuccess|文件上传成功时的钩子, 返回字段为 response, file, fileList|Function|-|
|on-uploadError|文件上传失败时的钩子，返回字段为 error, file, fileList|Function|-|
|on-uploadProgress|上传过程中触发，携带上传进度，返回字段为 file, percentage|Function|-|
|on-removeFile|文件列表移除文件时的钩子，返回字段为 file, fileList|Function|-|


## webuploader methods

|方法名|说明|参数|
|:---|:---|:---:|
|reset|清空已上传的文件列表|无|
|removeFile|移除文件|File|

## webuploader slot

|名称|说明|
|:---|:---|
|无|触发上传组件的控件|