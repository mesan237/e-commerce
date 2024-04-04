import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const BackButton = ({ link }) => {
  return (
    <Link to={link}>
      <Button variant="outline" className="gap-1 text-primary font-semibold">
        <MoveLeft size={20} />
        Go back
      </Button>
    </Link>
  );
};

export default BackButton;
