const getUserImage = (lettre) => {
  if (Number.isInteger(parseInt(lettre, 10))) {
    return 'https://cdn-expa.aiesec.org/gis-img/missing_profile_0.svg';
  }

  return `https://cdn-expa.aiesec.org/gis-img/missing_profile_${
    lettre && lettre.replace(/\s/g, '').charAt(0).toLowerCase()
  }.svg`;
};

export default getUserImage;
