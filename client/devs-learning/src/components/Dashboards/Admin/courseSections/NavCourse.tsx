import React from "react";

const NavCourse: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const [content, setContent] = React.useState(0);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ) => {
        setSelectedIndex(index);
        setContent(index);
    };

    const handlePageContent = (content: number) => {
        if (content === 0) {
          return ;
        } else if (content === 1) {
          return ;
        } else if (content === 2) {
          return ;
        } else if (content === 3) {
          return ;
        } else if (content === 4) {
          return ;
        } else if (content === 5) {
          return <div>LogOut</div>;
        }
      };

  return(
    <div>

    </div>
  )
}

export default NavCourse;