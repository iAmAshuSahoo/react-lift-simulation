import React, { useEffect, useState } from 'react'
import './Building.css';
import {LiftConfigContext} from '../../context/lift-config'
import {useContext} from 'react';

function Building() {
  const {simulateValue} = useContext(LiftConfigContext);
  const [lifts, setLifts] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(
    () => {
      const liftsArray = Array.from({ length: simulateValue.lifts }, (_, index) => index + 1);
      const tempLifts = []
      liftsArray.forEach((_, index) =>  {
        tempLifts.push({
          id: index,
          currentFloor: 0,
          openLeftLift: null,
          openRightLift: null,
          liftStyle:null,
          isMoving: false,
          movingTo: null,
        })
        setLifts(tempLifts);
    })
  }, [simulateValue])

  useEffect(() => {
    const interval = setInterval(() => {
      if (pending.length > 0) {
        const nearestLiftId = findNearestLift(pending[0]);
        console.log("pending", pending, 'nearestLift', nearestLiftId)
        if (lifts[nearestLiftId].isMoving === false) {
          moveLift(nearestLiftId, pending[0]);
          setPending(pending.slice(1))
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [pending])
  
  const findNearestLift = (destinationFloor) => {
    let nearestLiftDistance = simulateValue.floors-1;
    let nearestLiftId = lifts[0].id;
    console.log("nearestLiftDistance", nearestLiftDistance, lifts, "lifts", destinationFloor, "destinationFloor")
    for (let liftIndex = 0; liftIndex < lifts.length; liftIndex++) {
      const lift = lifts[liftIndex];
      if (
        Math.abs(lift.currentFloor - destinationFloor) < nearestLiftDistance &&
        lift.isMoving === false
      ) {
        nearestLiftDistance = Math.abs(lift.currentFloor - destinationFloor);
        nearestLiftId = lift.id;
      }
    }
    return nearestLiftId;
  };
  
  const moveLift = (nearestLiftId, destination) => {
    const liftIndex = lifts.findIndex((lift) => lift.id === nearestLiftId);
    if (liftIndex > -1) {
      const source = lifts[liftIndex].currentFloor;
      const distance = -1 * destination * 132;
      const time = Math.abs(source - destination) * 2;
      
      setLifts((prevLift) => {
        const tempLift = [...prevLift];
        tempLift[liftIndex].isMoving = true;
        tempLift[liftIndex].movingTo = destination;
        tempLift[liftIndex].liftStyle = {transform : `translateY(${distance}px)`,
          transition : `transform ${time}s`}
        setTimeout(() => {
          setLifts(() => {
            const tempLiftOpen = [...tempLift];
            tempLiftOpen[liftIndex].openLeftLift =  {
              transform : `translateX(-100%)`,
              transition : `transform 2.5s`,
            }
            tempLiftOpen[liftIndex].openRightLift = {
              transform : `translateX(100%)`,
              transition : `transform 2.5s`,}
              // setLifts(tempLiftOpen)
              setTimeout(() => {
                const tempLiftClose = [...tempLiftOpen];
                setLifts(() => {  
                  tempLiftClose[liftIndex].openLeftLift = {
                    transform : `translateX(0%)`, 
                    transition : `transform 2.5s`}
                  tempLiftClose[liftIndex].openRightLift = {
                    transform : `translateX(0)`,
                    transition : `transform 2.5s`}
                  setTimeout(() => {
                    tempLiftClose[liftIndex].currentFloor = destination;
                    tempLiftClose[liftIndex].movingTo = null;
                    tempLiftClose[liftIndex].isMoving = false;
                    setLifts(tempLiftClose)
                  }, 2500)
              return tempLiftClose
            })
          }, 2500)
          return tempLiftOpen
          })
        }, time * 1000)
        return tempLift;
      })
    }
  };

  function generateLift() {
    const liftsArray = Array.from({ length: simulateValue.lifts }, (_, index) => index + 1);
    const allLifts = liftsArray.map((_, index) =>  {
      return(
        <div className='lift' style={lifts[index] ? lifts[index].liftStyle : null} key={index}>
            <div className="left-door" style={lifts[index] ? lifts[index].openLeftLift : null}></div>
            <div className="right-door" style={lifts[index] && lifts[index].openRightLift}></div>
      </div>
      )
    })
    return allLifts;
  }
  
  function generateFloor() {
    const floorArray = Array.from({ length: simulateValue.floors }, (_, index) => index + 1);
    return floorArray.map((_, index) =>  {
      return(
        <div className='floor' key={index}>
          <div className="floor-controls">
            <div className='up-down-btn'>
                {!(index === 0) && <button className="up-btn bttn" onClick={() => handleClick(floorArray.length - index -1)}>Up</button>}
                {!(index === floorArray.length - 1) && <button className="down-btn bttn" onClick={() => handleClick(floorArray.length - index -1)}>Down</button>}
            </div>
            <div className='floor-no'>Floor-{floorArray.length - index}</div>
          </div>
          {index === floorArray.length-1 && generateLift()}
        </div>
      )
    })
  }

  const handleClick = (index) => {
    const liftAtFloor = lifts.findIndex(lift =>  {
        const status = lift.currentFloor === index && lift.isMoving === false;
        return status;
      });
    if (liftAtFloor > -1) {
      setLifts((prevLift) => {
        const tempLift = [...prevLift];
        tempLift[liftAtFloor].openLeftLift =  {
          transform : `translateX(-100%)`,
          transition : `transform 2.5s`,
        }
        tempLift[liftAtFloor].openRightLift = {
          transform : `translateX(100%)`,
          transition : `transform 2.5s`,}
        setTimeout(() => {
          const tempLiftClose = [...tempLift];
          tempLiftClose[liftAtFloor].openLeftLift = {
            transform : `translateX(0%)`, 
            transition : `transform 2.5s`}
            tempLiftClose[liftAtFloor].openRightLift = {
              transform : `translateX(0)`,
              transition : `transform 2.5s`}
          setLifts(tempLiftClose)
        }, 2500)
        return tempLift
      })
      return;
    }
    const isLiftGoingToFloor = lifts.find(
      (lift) => lift.movingTo === index && lift.isMoving === true
    );
    if (isLiftGoingToFloor) {
      console.log("lift heading towards it wait.");
      return;
    }
    setPending([...pending, index]);
  }

  return (
    <>
    {
      simulateValue?.floors > 0 ?
        generateFloor() : null
    }
    </>
  )
}

export default Building