import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

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
      {/* <div className="grid grid-cols-2 auto-cols-auto grid-flow-col"> */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          id="search"
          type="search"
          className=""
          placeholder="search products..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <Button variant="outline" size="icon" type="submit">
          <Search className="size-4 text-orange-600 font-semibold " />
        </Button>
      </form>
    </div>
  );
};

export default SearchBox;
