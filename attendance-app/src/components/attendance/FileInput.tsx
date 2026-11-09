import { useRef, useState } from "react";
import { BiCamera } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

interface FileInputProps {
  onChange: (files: FileList | null) => void;
  onBlur: () => void;
  name: string;
  prompt: string;
  setIsFileSelected: (isSelected: boolean) => void;
}

function FileInput({
  onChange,
  onBlur,
  name,
  prompt,
  setIsFileSelected,
}: FileInputProps) {
  const [file, setFile] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileReset = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange(null);
    setFile(null);
    setIsFileSelected(false);
  };

  return (
    <>
      {file && file.length && file[0] && (
        <div className="relative">
          <img src={URL.createObjectURL(file[0])} />
          <IoClose
            onClick={onFileReset}
            className="text-gray-300 bg-[rgba(0,0,0,0.55)] absolute top-2 right-2"
            size={30}
          />
        </div>
      )}
      {(!file || !file.length) && (
        <div
          className="flex flex-col items-center border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-black transition-colors bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
        >
          <BiCamera size={48} className="text-black" />
          <p className="text-xs text-gray-500">{prompt}</p>
          <p className="text-[10px] text-gray-400">
            (.jpeg/.png and &lt; 4 MB)
          </p>
          <input
            hidden
            ref={fileInputRef}
            type="file"
            name={name}
            accept="image/jpeg,image/png"
            onChange={(e) => {
              onChange(e.target.files);
              setFile(e.target.files);
              setIsFileSelected(true);
            }}
            onBlur={onBlur}
          />
        </div>
      )}
    </>
  );
}

export default FileInput;
