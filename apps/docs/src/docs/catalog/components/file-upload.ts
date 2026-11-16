import { ui, prop } from "../../model";

export default {
  ...ui(
    "file-upload",
    "File Upload 文件选择",
    "使用 Dice UI 的可访问文件选择与拖放入口。",
    "FileUpload, FileUploadDropzone, FileUploadTrigger",
    "<FileUpload value={files} onValueChange={setFiles} multiple>\n  <FileUploadDropzone>拖放文件到此处</FileUploadDropzone>\n  <FileUploadTrigger asChild><Button>选择文件</Button></FileUploadTrigger>\n</FileUpload>",
    [
      prop(
        "value / onValueChange",
        "File[] / (files: File[]) => void",
        "本地文件列表，不代表上传已完成。",
      ),
      prop(
        "accept / multiple",
        "string / boolean",
        "原生文件类型过滤与数量模式。",
      ),
    ],
    ["上传、存储和权限由应用提供；选择文件不代表完成服务端保存。"],
  ),
  order: 12,
};
