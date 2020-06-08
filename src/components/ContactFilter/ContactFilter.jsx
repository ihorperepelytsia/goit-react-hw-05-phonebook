import React from 'react';
import PropTypes from 'prop-types';
import './filter.scss';

const ContactFilter = ({ value, onChangeFilter }) => (
  <>
    <div className="contact-filter">
      <label>
        Find Contacts by Name
        <input
          type="text"
          value={value}
          onChange={onChangeFilter}
          placeholder="Type to filter contact..."
        />
      </label>
    </div>
  </>
);

ContactFilter.propType = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
export default ContactFilter;
