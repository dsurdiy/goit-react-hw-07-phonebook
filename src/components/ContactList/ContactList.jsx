import PropTypes from 'prop-types';
import { Contact } from 'components/Contact/Contact';
import { Contacts, ContactsItem } from './ContactList.styled';

export const ContactList = ({ contacts }) => {
  return (
    <Contacts>
      {contacts.map(({ id, name, phone }) => (
        <ContactsItem key={id}>
          <Contact id={id} name={name} phone={phone} />
        </ContactsItem>
      ))}
    </Contacts>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};
