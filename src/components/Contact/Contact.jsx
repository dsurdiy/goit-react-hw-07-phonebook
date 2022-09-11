import PropTypes from 'prop-types';
import { GrContactInfo } from 'react-icons/gr';
import { BiPhone } from 'react-icons/bi';
import { ContactInfo, DeleteBtn } from './Contact.styled';
import { Spinner } from 'components/Spinner/Spinner';
import { useDeleteContactMutation } from 'redux/contactsSlice';
import { toast } from 'react-toastify';

export const Contact = ({ id, name, phone }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const handleDeleteContact = async id => {
    try {
      await deleteContact(id);
      toast.info(`Contact ${name} deleted!`);
    } catch (error) {
      toast.error('Something went wrong :(');
    }
  };

  return (
    <>
      <ContactInfo>
        <span>
          <GrContactInfo />
          {name}
        </span>
        <span>
          <BiPhone />
          {phone}
        </span>
      </ContactInfo>
      <DeleteBtn
        type="button"
        disabled={isLoading}
        onClick={() => handleDeleteContact(id)}
      >
        {isLoading ? <Spinner /> : 'Delete'}
      </DeleteBtn>
    </>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
