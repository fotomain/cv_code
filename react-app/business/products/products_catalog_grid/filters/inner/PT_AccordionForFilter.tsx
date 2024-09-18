


import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';

const AccordionForFilterStyled = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
        ))(({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            '&:not(:last-child)': {
                borderBottom: 0,
            },
            '&::before': {
                display: 'none',
                // maxWidth: '10px',
            },
        }));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
        ))(({ theme }) => ({
            backgroundColor:
                theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, .05)'
                    : 'rgba(0, 0, 0, .03)',
            flexDirection: 'row-reverse',
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'rotate(90deg)',
            },
            '& .MuiAccordionSummary-content': {
                marginLeft: theme.spacing(1),
            },
        }));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



const PT_AccordionForFilter = (props:any) => {

    // return(<></>)

    return(<>
        <AccordionForFilterStyled expanded={props?.expanded}
                                     id={'accordion_filters_prices_expanded'}
                                     // www Accordion
                                     // wwwMain Products Filters maxWidth
                                     sx={{maxWidth: '240px',}}
                                     onChange={()=>{
                                         props?.onChange()
                                     }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreOutlinedIcon />}
            >
                <span style={{fontFamily: "roboto-regular",}}>
                    {props.AccordionSummaryNode}
                </span>

            </AccordionSummary>

            <AccordionDetails>
                {props.children}
            </AccordionDetails>
        </AccordionForFilterStyled>
    </>)

}

export default PT_AccordionForFilter
