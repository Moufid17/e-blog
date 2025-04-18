import {Button, DialogContent, DialogTitle, FormControl, FormLabel, Input, Modal, ModalDialog, Stack} from '@mui/joy';

import { AccountEditProfileType } from '@/app/common/types/account';

interface AccountEditProfileProps {
  data: AccountEditProfileType;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleSubmit: (data: any) => void;
}

export default function AccountEditProfile({data, isOpen, setIsOpen, handleSubmit}: AccountEditProfileProps) {

  return (
    <>
      <Modal open={isOpen} onClose={() => {
        setIsOpen(false);
      }}>
        <ModalDialog>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>Fill in the information of your profile.</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const modalData = {
                    pseudo: formData.get('pseudo') as string,
                    job: formData.get('job') as string,
                    linkedin: formData.get('linkedin') as string,
                    github: formData.get('github') as string,
                };
                handleSubmit(modalData);
                setIsOpen(false);
            }}
          >
            <Stack spacing={2}>
                <>
                  <FormControl required>
                    <FormLabel>Pseudo</FormLabel>
                    <Input name='pseudo' autoFocus required defaultValue={data.pseudo ?? ""}/>
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Job</FormLabel>
                    <Input name='job' required defaultValue={data.job ?? ""}/>
                  </FormControl>
                  <FormControl required>
                    <FormLabel>LinkedIn</FormLabel>
                    <Input name='linkedin' required defaultValue={data.linkedin ?? ""}/>
                  </FormControl>
                  <FormControl required>
                    <FormLabel>Github</FormLabel>
                    <Input name='github' required defaultValue={data.github ?? ""}/>
                  </FormControl>
                </>
              <Button type="submit">Save</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}