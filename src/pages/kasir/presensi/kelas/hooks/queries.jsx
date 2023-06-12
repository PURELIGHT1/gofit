import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useMasterApi from "../../../../../utils/MasterApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ROUTES } from "../../../../../utils/helper/routes";

const queryKeys = {
    all: ['presensiKelas'],
    allBookings : ['bookingKelas'],
};

export const usePresensiKelas = () => {
    return useQuery(queryKeys.all, useMasterApi().useGetPresensiKelas);
};