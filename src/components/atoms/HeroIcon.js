import {lookupIcon} from "heroicons-lookup";

const HeroIcon = ({iconName="ArrowLeftIcon", iconType="solid", width="25", height="25"}) => {
  const Icon = lookupIcon(iconName, iconType)
  return (
    <i>
      <Icon style={{width: width,height: height}}/>
    </i>
    
  )
}

export default HeroIcon