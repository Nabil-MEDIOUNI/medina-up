const generateProductSVGRout = (product) => {
  const src = '/static/icons/programms/';
  switch (product) {
    case 'GlobalVolunteer':
      return `${src}GV_White.png`;
    case 'GlobalTalent':
      return `${src}GTa_White.png`;
    case 'GlobalTeacher':
      return `${src}GTe_White.png`;
    case 'GV':
      return `${src}GV_White.png`;
    case 'GTa':
      return `${src}GTa_White.png`;
    case 'GTe':
      return `${src}GTe_White.png`;
    default:
      return null;
  }
};

export default generateProductSVGRout;
