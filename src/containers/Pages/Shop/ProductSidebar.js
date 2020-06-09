import React, {useState} from "react"
import {Divider, Grid, Typography} from "@material-ui/core";
import RichText from "../../../components/RichText";
import AnimateHeight from "react-animate-height";
import Link from "../../../components/Link";
import ExpansionPanel from "./ExpansionPanel";
import CheckboxFromControl from "./CheckboxFormControl";
import Button from "../../../components/Button";
import styled from "styled-components";
import SizeGuide from "./SizeGuide";

const Sale = styled.span`
  text-decoration: line-through;
`
const AddToBagWrapper = styled.div`
  margin: 64px 0;
`

const ProductSidebar = ({product, colors, isMobile, sizeGuide}) => {
    const leatherOptions = product?.attributes.filter(attribute => attribute.id === 3)[0]?.options;
    const colorOptions = product?.attributes.filter(attribute => attribute.id === 4)[0]?.options;
    const sizeOptions = product?.attributes.filter(attribute => attribute.id === 2)[0]?.options;
    const isPreOrder = product?.stock_status === 'onbackorder'
    const isOutOfStock = product?.stock_status === 'outofstock'
    const isVeganOption = !!leatherOptions?.filter(opt => opt === 'Vegan')[0]

    const [leatherType, setLeatherType] = useState(null)
    const [colorType, setColorType] = useState(null)
    const [sizeType, setSizeType] = useState(null)
    const [openDetails, setOpenDetails] = useState(false)

    const Description = () => {
        return (
            <React.Fragment>
                <RichText>{product.short_description}</RichText>
                <AnimateHeight
                    duration={ 300 }
                    height={ openDetails ? 'auto' : 0}
                >
                    <RichText style={{padding: '0 0 1rem'}}>{product.description}</RichText>
                </AnimateHeight>
                <Link color="secondary" onClick={() => setOpenDetails(!openDetails)}><b>{openDetails ? 'less details' : 'more details'}</b></Link>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <Typography component="h2" variant="h2">{product?.name}</Typography>
            <Typography component="h2" variant="h2">
                {product.on_sale ?
                    <><Sale>€ {product.regular_price}</Sale> - € {product.sale_price}</> :
                    `€ ${product.price}`
                }
                {isOutOfStock && ' - out of stock'}
                {isPreOrder && ' - pre-order'}
            </Typography>
            {!isMobile && <Description />}
            <Divider />
            {isVeganOption && (
                <React.Fragment>
                    <ExpansionPanel title={<Typography><b>Leather type :</b> {leatherType || leatherOptions[0]}</Typography>}>
                        <CheckboxFromControl options={leatherOptions} type={leatherType} setType={setLeatherType} />
                    </ExpansionPanel>
                    <Divider />
                </React.Fragment>
            )}
            {colorOptions && (
                <React.Fragment>
                    <ExpansionPanel title={<Typography><b>Color :</b> {colorType || colorOptions[0]}</Typography>}>
                        <CheckboxFromControl colors={colors} options={colorOptions} type={colorType} setType={setColorType} />
                    </ExpansionPanel>
                    <Divider />
                </React.Fragment>
            )}
            <ExpansionPanel plusMinus title={<Typography><b>Size :</b> {sizeType || (sizeOptions ? sizeOptions[0] : 'one size')}</Typography>}>
                {sizeOptions && (
                    <CheckboxFromControl options={sizeOptions} type={sizeType} setType={setSizeType} />
                )}
                <div>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt. <br />
                    {sizeGuide && <SizeGuide sizes={sizeGuide}/>}
                </div>
            </ExpansionPanel>
            <Divider />
            {isMobile && <Description />}
            <AddToBagWrapper>
                {isPreOrder && (
                    <React.Fragment>
                        <Typography variant="body2" component="p">Expected shipping in 60 days</Typography>
                        <Button color="secondary" variant="contained">pre-order</Button>
                    </React.Fragment>
                )}
                {isOutOfStock && (
                    <Button color="secondary" variant="contained">get notified</Button>
                )}
                {!isPreOrder && !isOutOfStock && (
                    <Button color="secondary" variant="contained">add to bag</Button>
                )}
            </AddToBagWrapper>
            <Divider />
            <ExpansionPanel plusMinus title={<Typography>Special enquiries</Typography>}>
                <div>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt. <br />
                    go to : <Link color="secondary"><b>Made to order</b></Link>
                </div>
            </ExpansionPanel>
            <Divider />
            <ExpansionPanel plusMinus title={<Typography>Product care</Typography>}>
                <div>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt. <br />
                    go to : <Link color="secondary"><b>Product care</b></Link>
                </div>
            </ExpansionPanel>
            <Divider />
            <ExpansionPanel plusMinus title={<Typography>Shipping and returns</Typography>}>
                <div>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt. <br />
                    go to : <Link color="secondary"><b>Shipping and returns</b></Link>
                </div>
            </ExpansionPanel>
            <Divider />
        </React.Fragment>
    )
}

export default ProductSidebar