
import {React,useState} from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip, Tooltip, styled } from '@mui/material';
import Delete from '@mui/icons-material/Delete';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const CardComponent = ({content ,HandleDelete}) => {

  const [msg, setmsg] = useState(JSON.parse(content.msg || "{}"));
  const [expanded, setExpanded] = useState(false);
  console.log(msg);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const FormatDate = (time) => {
    const date = new Date(time); // replace with your date
const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }


  return (
      <>
      <Card sx={{ maxWidth: 345 }}
      style={{minWidth:"300px",textTransform:"capitalize"  }}
      >
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={msg?.title}
        subheader={FormatDate(content?.time)}
      />
     
      <CardContent>
          <Typography variant="body2" color="text.secondary" style={{ display: "flex", justifyContent: "space-between" }}>
            <Chip label={msg?.difficulty} color={msg?.difficulty=="easy"?"success":(msg?.difficulty=="medium"?"warning":"error")} />
            <Tooltip title={msg?.url} style={{cursor:"pointer"}}>
            <a href={msg?.url} target="_blank"><Chip label={"Link"} color={"primary"}  /></a>
           </Tooltip>
        
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
            <Tooltip title="Remove" onClick={(e)=>HandleDelete(content?.taskId)}>
            <Delete />
         </Tooltip>
        </IconButton>
        <IconButton aria-label="share">
         <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          
          <Typography paragraph>
            {msg?.description}
          </Typography>
         
        
        
        </CardContent>
      </Collapse>
    </Card>
        
      
      </>
  )
}

export default CardComponent