import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchBox = () => {
  const { keyword: urlKeyword } = useParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      setKeyword("");
      navigate(`search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center py-4">
          <button type="submit" className="p-2 focus:outline-none focus:ring">
            <Search className="size-4 text-orange-600 font-semibold stroke-2" />
          </button>
        </span>
        <Input
          id="search"
          type="search"
          className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none"
          placeholder="search products..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchBox;
