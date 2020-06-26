import React, {useState, useMemo} from "react"
import {Divider, Typography, Collapse} from "@material-ui/core"
import {useDispatch} from "react-redux"
import {addWishlistItem} from "../Wishlist/actions"
import styled from "styled-components"
import RichText from "../../../components/RichText"
import Link from "../../../components/Link"
import ExpansionPanel from "./ExpansionPanel"
import CheckboxFromControl from "./CheckboxFormControl"
import Button from "../../../components/Button"
import SizeGuide from "./SizeGuide"
import GetNotified from "./GetNotified";
import AddToBag from "./AddToBag";

const Sale = styled.span`
  text-decoration: line-through;
`
const AddToBagWrapper = styled.div`
  margin: 40px 0;
`

const ProductSidebar = ({variations, product, colors, isMobile, sizeGuide}) => {
    const dispatch = useDispatch()
    const leatherOptions = product?.attributes.filter(attribute => attribute.id === 3)[0]?.options
    const colorOptions = product?.attributes.filter(attribute => attribute.id === 4)[0]?.options
    const sizeOptions = product?.attributes.filter(attribute => attribute.id === 2)[0]?.options
    const isPreOrder = product?.stock_status === 'onbackorder'
    const isOutOfStock = product?.stock_status === 'outofstock'
    const isVeganOption = !!leatherOptions?.filter(opt => opt === 'Vegan')[0]

    const [leatherType, setLeatherType] = useState(leatherOptions ? leatherOptions[0] : null)
    const [colorType, setColorType] = useState(colorOptions ? colorOptions[0] : null)
    const [sizeType, setSizeType] = useState(sizeOptions ? sizeOptions[0] : null)
    const [openDetails, setOpenDetails] = useState(false)

    const itemId = variations?.length ?
        variations.filter(variation => {
            return ((!leatherType || variation.attributes.filter(attr => attr.id === 3 && attr.option === leatherType).length > 0) &&
                (!colorType || variation.attributes.filter(attr => attr.id === 4 && attr.option === colorType).length > 0) &&
                (!sizeType || variation.attributes.filter(attr => attr.id === 2 && attr.option === sizeType).length > 0))
        })[0]?.id :
        product.id

    return( useMemo(() => (
            <React.Fragment>
                <Typography component="h2" variant="h2" style={{paddingTop: '10px'}}>{product?.name}<br />
                    {product.on_sale ?
                        <><Sale>€ {product.regular_price}</Sale> - € {product.sale_price}</> :
                        `€ ${product.price}`
                    }
                    {isOutOfStock && ' - out of stock'}
                    {isPreOrder && ' - pre-order'}
                </Typography>
                {!isMobile && (
                    <React.Fragment>
                        <RichText>{product.short_description}</RichText>
                        <Collapse in={openDetails}>
                            <RichText style={{padding: '0 0 1rem'}}>{product.description}</RichText>
                        </Collapse>
                        <Link color="secondary" onClick={() => setOpenDetails(!openDetails)}><b>{openDetails ? 'less details' : 'more details'}</b></Link>
                    </React.Fragment>
                )}
                {!isMobile && <Divider />}
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
                <ExpansionPanel title={<Typography><b>Size :</b> {sizeType || (sizeOptions ? sizeOptions[0] : 'one size')}</Typography>}>
                    {sizeOptions && (
                        <CheckboxFromControl options={sizeOptions} type={sizeType} setType={setSizeType} />
                    )}
                    <div>
                        <Typography component="p" variant="body1">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.
                        </Typography>
                        <br />
                        {sizeGuide && <SizeGuide sizes={sizeGuide}/>}
                    </div>
                </ExpansionPanel>
                <Divider />
                {isMobile && (
                    <React.Fragment>
                        <RichText>{product.short_description}</RichText>
                        <Collapse in={openDetails}>
                            <RichText style={{padding: '0 0 1rem'}}>{product.description}</RichText>
                        </Collapse>
                        <Link color="secondary" onClick={() => setOpenDetails(!openDetails)}><b>{openDetails ? 'less details' : 'more details'}</b></Link>
                    </React.Fragment>
                )}
                <AddToBagWrapper>
                    {isPreOrder && (
                        <React.Fragment>
                            <Typography variant="body2" component="p">Expected shipping in 60 days</Typography>
                            <AddToBag name={product.name} itemId={itemId} leather={leatherType} size={sizeType} color={colorType} image={product.images[0].src} slug={product.slug} price={product.price}>pre-order</AddToBag>
                        </React.Fragment>
                    )}
                    {isOutOfStock && (
                        <GetNotified isMobile={isMobile} colorType={colorType} leatherType={leatherType} sizeType={sizeType} product={product} itemId={itemId} />
                    )}
                    {!isPreOrder && !isOutOfStock && (
                        <AddToBag name={product.name} itemId={itemId} leather={leatherType} size={sizeType} color={colorType} image={product.images[0].src} slug={product.slug} price={product.price} />
                    )}
                    <Button disableGutters disableRipple onClick={() => dispatch(addWishlistItem(itemId, product.name, product.price, leatherType, sizeType, colorType, product.image.src, product.slug, 1))}>add to whishlist</Button>
                </AddToBagWrapper>
                {!isMobile && <Divider />}
                <ExpansionPanel plusMinus title={<Typography>Special enquiries</Typography>}>
                    <Typography component="p" variant="body1">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt. <br />
                        go to : <Link color="secondary"><b>Made to order</b></Link>
                    </Typography>
                </ExpansionPanel>
                <Divider />
                <ExpansionPanel plusMinus title={<Typography>Product care</Typography>}>
                    <Typography component="p" variant="body1">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt. <br />
                        go to : <Link color="secondary"><b>Product care</b></Link>
                    </Typography>
                </ExpansionPanel>
                <Divider />
                <ExpansionPanel plusMinus title={<Typography>Shipping and returns</Typography>}>
                    <Typography component="p" variant="body1">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt. <br />
                        go to : <Link color="secondary"><b>Shipping and returns</b></Link>
                    </Typography>
                </ExpansionPanel>
                <Divider />
            </React.Fragment>
        ), [colorOptions, colorType, colors, dispatch, isMobile, isOutOfStock, isPreOrder, isVeganOption, itemId, leatherOptions, leatherType, openDetails, product, sizeGuide, sizeOptions, sizeType])

    )
}

export default ProductSidebar