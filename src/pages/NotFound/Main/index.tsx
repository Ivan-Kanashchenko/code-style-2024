// Lib
import { FC } from "react";
// Icons
import { ManageAccountsIcon } from "icons";
// Layouts
// Components
import { NoItemsContent } from "components";
// Styled
import { ContentBox } from "styled/Box";

export const NotFound: FC = () => {
  return (
    <ContentBox>
      <NoItemsContent
        Icon={ManageAccountsIcon}
        message="You don`t have access to check the modules"
        description="Contact your administrator for the necessary permissions"
      />
    </ContentBox>
  );
};
