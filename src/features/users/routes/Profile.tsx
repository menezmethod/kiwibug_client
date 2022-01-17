import React from 'react';

import { ContentLayout } from '@/components/Layout/ContentLayout';
import { useAuth } from '@/lib/auth';
import { formatRoleAuth } from '@/utils/format';
import { Divider, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

import EditUser from '../components/EditUser';

const Item = styled(Paper)({
  padding: 8,
});

const ProfileText = styled(Typography)({
  padding: 8,
});

const ProfileSubText = styled('span')({
  fontWeight: 500,
});

const SubButton = styled('div')({
  textAlign: 'center',
});
export const Profile = () => {
  const { user } = useAuth();
  const role = formatRoleAuth(user?.authorities);

  return (
    <ContentLayout title="User Profile">
      <Box>
        <Item>
          <ProfileText variant="h5" component="h2">
            User Profile
          </ProfileText>
          <ProfileText variant="body2">User's personal details</ProfileText>
          <Divider />
          <ProfileText variant="body2">
            <ProfileSubText>Full Name:</ProfileSubText> {user?.name}
          </ProfileText>
          <Divider />
          <ProfileText variant="body2">
            <ProfileSubText>Username:</ProfileSubText> {user?.username}
          </ProfileText>
          <Divider />
          <ProfileText variant="body2">
            <ProfileSubText>Email:</ProfileSubText> {user?.email}
          </ProfileText>
          <Divider />
          <ProfileText variant="body2">
            <ProfileSubText>Role:</ProfileSubText> {role}
          </ProfileText>
        </Item>
        <br />
        <SubButton>
          <EditUser employeeId={String(user?.id)} />
        </SubButton>
      </Box>
    </ContentLayout>
  );
};
