resource "aws_iam_policy_attachment" "list_booking_policy_attachment" {
  name       = "${var.environment}-list-booking-attachment"
  roles      = [aws_iam_role.list_booking_iam_role.name]
  policy_arn = aws_iam_policy.list_booking_policy.arn
}

