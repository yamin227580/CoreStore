import { X } from "lucide-react";
import { Dispatch, forwardRef, SetStateAction, useState } from "react";
import { Input } from "../ui/input";

type TagsInputProps = {
  value: string[]; //the current value of the field(here tags field) value:tag field.value
  handleOnChange: Dispatch<SetStateAction<string[]>>;
};

const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(
  ({ value, handleOnChange, ...props }, ref) => {
    const [tagData, setTagData] = useState("");
    const addNewTag = () => {
      if (tagData) {
        const newTagsData = new Set([...value, tagData]);
        handleOnChange(Array.from(newTagsData));
        setTagData("");
      }
    };
    return (
      <div>
        <div>
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNewTag();
              }
            }}
            placeholder="Enter to save"
            value={tagData}
            {...props}
            onChange={(e) => setTagData(e.target.value)}
          />
          <div className="flex gap-1 my-2 flex-wrap">
            {value.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1  border-gray-400 border-2 rounded-md text-xs p-1 font-semibold"
              >
                <span>{tag}</span>
                <X
                  className="w-4 h-4 cursor-pointer"
                  onClick={() =>
                    handleOnChange(value.filter((_, i) => i !== index))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
export default TagsInput;
