const validateVote = ({ upVote }) => {
  if (typeof upVote === 'number') return { valid: true };
  return { valid: false, message: 'Vote must be an Integer.', status: 400 };
};

export default validateVote;
