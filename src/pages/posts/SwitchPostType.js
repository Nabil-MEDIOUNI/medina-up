import React from 'react';
import { Box, Typography } from '@material-ui/core';
import useStyles from './styles';

const SwitchPostType = ({ data }) => {
  const classes = useStyles();

  function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
  }

  const checkFileType = (file) => {
    if (file.split('/')[1] === 'pdf') {
      return 'https://cdn-expa.aiesec.org/icons/pdf.svg';
    }
    return 'https://cdn-expa.aiesec.org/icons/document.svg';
  };

  const attachementType = (p) => p.component_attachment.type?.split('/')[0];
  const isDOCX = (p) => p.component_attachment.type.includes('word');

  const switchPosts = (p) => {
    switch (attachementType(p)) {
      case 'application':
        return (
          <a
            href={p.component_attachment.file.replace('pdf', 'jpg')}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Box
              bgcolor="#f3f3f3"
              p="12px 8px"
              display="flex"
              alignItems="center"
            >
              <img
                src={checkFileType(p.component_attachment.type)}
                alt=""
                width="15%"
              />
              <Box ml={1.5}>
                <Typography variant="body2">
                  {p.component_attachment.filename}
                </Typography>
                <Typography variant="caption">
                  <span className={classes.fileType}>
                    {isDOCX(p)
                      ? 'docx'
                      : p.component_attachment.type.split('/')[1]}
                  </span>
                  {' '}
                  file (
                  {bytesToSize(p.component_attachment.filesize)}
                  )
                </Typography>
              </Box>
            </Box>
          </a>
        );
      case 'image':
        return (
          <a
            href={p.component_attachment.file}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <img
              id="img"
              src={p.component_attachment.file}
              alt=" "
              width="100%"
              height="100%"
            />
          </a>
        );
      default:
        break;
    }
  };

  return (
    <>
      {data.post_components.map((p) => (
        <>{switchPosts(p)}</>
      ))}
    </>
  );
};

export default SwitchPostType;
